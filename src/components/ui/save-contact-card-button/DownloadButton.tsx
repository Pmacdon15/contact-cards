import { saveAs } from 'file-saver';
import { ContactInfo } from '@/types/types';

const typeMapping: { [key: number]: string } = {
  1: 'TEL',
  2: 'EMAIL',
  3: 'ADR',
  4: 'URL',
};

export default function DownloadButton({ contactInfo, contactName }: { contactInfo: ContactInfo[], contactName: string }) {
  const handleDownload = async () => {
    try {
      const vCardData = generateVCard(contactName, contactInfo);
      const blob = new Blob([vCardData], { type: 'text/vcard' });
      saveAs(blob, `${contactName}.vcf`);
    } catch (error) {
      console.error('Error generating or saving vCard:', error);
      // Provide user feedback, e.g., toast notification or alert
    }
  };

  return (
    <button
      className=""
      onClick={handleDownload}
    >
            <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="size-6 bg-[--foreground] h-12 w-12 rounded-full p-4"
      >
        <path d="M8.75 2.75a.75.75 0 0 0-1.5 0v5.69L5.03 6.22a.75.75 0 0 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 8.44V2.75Z" />
        <path d="M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z" />
      </svg>
    </button>
  );
}

const generateVCard = (contactName: string, contactInfo: ContactInfo[]) => {
  let vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${contactName}\n`;

  contactInfo.forEach((info) => {
    const type = typeMapping[info.type];
    if (!type) return;

    switch (info.type) {
      case 3:
        const addressParts = info.value.split(',').map((part) => part.trim());
        const formattedAddress = addressParts.join(';');
        vCardData += `ADR;TYPE=${info.name}:${formattedAddress}\n`;
        break;
      default:
        vCardData += `${type};TYPE=${info.name}:${info.value}\n`;
    }
  });

  return `${vCardData}END:VCARD`;
};