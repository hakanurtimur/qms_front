export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const uint8Array = new Uint8Array(arrayBuffer);

      // Uint8Array'i parça parça işlemek yerine doğrudan Base64'e çevirme
      let binaryString = "";
      uint8Array.forEach((byte) => {
        binaryString += String.fromCharCode(byte);
      });

      const base64String = btoa(binaryString); // Base64'e çevir
      resolve(base64String);
    };

    reader.onerror = () => {
      reject(new Error("Dosya Base64'e dönüştürülemedi"));
    };

    reader.readAsArrayBuffer(file); // Dosyayı bir ArrayBuffer olarak oku
  });
};
