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
      className="bg-[var(--container)] text-[var(--primary)] shadow-lg p-4 text-xl"
      onClick={handleDownload}
    >
      Download Contact Card
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