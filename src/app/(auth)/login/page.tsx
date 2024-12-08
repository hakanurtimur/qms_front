"use client";

import Login from "@/components/auth/Login";
import { useMutation, useQuery } from "@tanstack/react-query";
import listService from "@/services/ListService";
import { UserLogin } from "@/models/auth";
import { useRouter } from "next/navigation";
import authService from "@/services/AuthService";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import tokenService from "@/services/TokenService";
import { AIChatBox } from "@/components/ui/ai-chat-box";
import geminiService from "@/services/GeminiService";
import { GeminiAxiosResponse, GeminiRequest } from "@/models/gemini-ai";

const Page = () => {
  const { onSetAuthenticated, onSetUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<
    { text: string; type: string; id: number; isUser: boolean }[]
  >([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const query = useQuery({
    queryKey: ["locations"],
    queryFn: () => listService.getLocations(),
  });

  const moduleQuery = useQuery({
    queryKey: ["modules"],
    queryFn: () => listService.getModules(),
  });

  const modelPrompt = `
    Sen ISO standartları, kalite yönetimi, hizmet kalitesi, denetim ve iç denetim gibi belirli konular üzerine özelleşmiş bir uzmansın. Yalnızca aşağıdaki konulara ilişkin soruları yanıtlamalısın ve başka hiçbir soruya yanıt vermemelisin. 
Eğer gelen soru aşağıdaki listede yoksa, bunu net bir şekilde belirtmelisin:

1. ISO 27001 standardı nedir ve nasıl uygulanır?
2. ISO 9001 standardı nedir ve kalite yönetimindeki önemi nedir?
3. Kalite yönetimi nedir ve nasıl sağlanır?
4. Hizmet kalitesi nedir ve nasıl ölçülür?
5. Denetim nedir ve neden önemlidir?
6. İç denetim nedir, nasıl yapılır ve faydaları nelerdir?

**Önemli Kısıtlamalar:**
- Bu liste dışındaki sorulara kesinlikle yanıt verme. Örneğin, farklı bir konu hakkında soru gelirse, şu şekilde cevap ver: "Bu soruya yanıt veremem çünkü yalnızca belirli ISO standartları ve kalite yönetimiyle ilgili sorulara yanıt verebilirim."
- Cevapların mutlaka kısa, doğru ve resmi bir üslup içermeli.

  `;

  useEffect(() => {
    const authToken = !tokenService.isAccessTokenExpired();
    if (authToken) {
      router.push("/user");
    }
    setLoading(false);
  }, [router]);

  const mutation = useMutation({
    mutationFn: (data: UserLogin) => authService.userLogin(data),
    onSuccess: (data) => {
      toast({
        variant: "success",
        description: "Başarıyla giriş yapıldı",
      });
      onSetAuthenticated(true);
      onSetUser(data);
      router.push("/user");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error.message,
      });
      setError(error.message);
    },
  });

  const handleSubmit = async (data: UserLogin) => {
    await mutation.mutateAsync(data);
  };
  const sendMessageToAI = useMutation({
    mutationFn: (data: GeminiRequest) => geminiService.getAIResponse(data),
    onSuccess: (res: GeminiAxiosResponse) => {
      const response = res?.data?.candidates[0].content.parts[0].text;
      setMessages((prev) => [
        ...prev,
        { text: response, type: "ai", id: Math.random(), isUser: true },
      ]);
    },
  });
  const handleSendMessage = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (input.trim()) {
      console.log(input);
      const request: GeminiRequest = {
        contents: [
          {
            parts: [
              {
                text: modelPrompt,
              },
            ],
            role: "model",
          },
          {
            parts: [
              {
                text: input,
              },
            ],
            role: "user",
          },
        ],
      };
      setMessages((prev) => [
        ...prev,
        { text: input, type: "user", id: Math.random(), isUser: true },
      ]);
      setInput("");
      sendMessageToAI.mutate(request);
    }
  };

  return (
    <div>
      {loading ? null : (
        <Login
          locations={query.data?.data ?? []}
          locationLoading={query.isPending}
          modules={moduleQuery.data?.data ?? []}
          moduleLoading={moduleQuery.isPending}
          onSubmit={handleSubmit}
          error={error}
          formLoading={mutation.isPending}
        />
      )}
      <AIChatBox
        messages={messages}
        input={input}
        setInput={setInput}
        handleSendMessage={handleSendMessage}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
};

export default Page;
