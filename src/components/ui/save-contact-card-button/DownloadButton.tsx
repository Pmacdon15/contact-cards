import { saveAs } from 'file-saver';
import { ContactInfo } from '@/types/types';
import VCard from 'vcard-creator'

export default function DownloadButton({ contactInfo, contactName, profileImageUrl }: { contactInfo: ContactInfo[], contactName: string, profileImageUrl: string | null }) {
  const handleDownload = async () => {
    try {
      const vCardData = await generateVCard(contactName, contactInfo, profileImageUrl || '');
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
        className="size-6 bg-[--foreground] h-16 w-36 rounded-full p-4"
      >
        <path d="M8.75 2.75a.75.75 0 0 0-1.5 0v5.69L5.03 6.22a.75.75 0 0 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 8.44V2.75Z" />
        <path d="M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z" />
      </svg>
    </button>
  );
}


const generateVCard = async (contactName: string, contactInfo: ContactInfo[], profileImageUrl: string) => {
  const vcard = new VCard();

  vcard.addName(contactName);

  // Add profile image
  if (profileImageUrl) {
    const imageData = await getBase64Image(profileImageUrl);
    vcard.addPhoto(imageData as string, 'JPEG');
  }

  contactInfo.forEach((info) => {
    switch (info.type) {
      case 1:// Phone
        vcard.addPhoneNumber(info.value, info.name);
        break;
      case 2: // Email
        vcard.addEmail(info.value, info.name);
        break;
      case 3: // Address
        vcard.addAddress(info.value, info.name);
        break;
      case 4: // Website
        vcard.addURL(info.value, info.name);
        break;
      case 6: // LinkedIn
        vcard.addURL(`https://www.linkedin.com/in/${info.value}`, 'LinkedIn');
        break;
      case 7: // GitHub
        vcard.addURL(`https://github.com/${info.value}`, 'GitHub');
        break;
    }
  });
  console.log(vcard.toString());
  return vcard.toString();
};

async function getBase64Image(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.readAsDataURL(blob);
      reader.onload = () => {
        if (reader.result) {
          resolve((reader.result as string).split(',')[1]);
        } else {
          reject('Failed to load image');
        }
      };
      reader.onerror = () => {
        reject('Error loading image');
      };
    });
  } catch (error) {
    console.error('Error loading image:', error);
    throw error;
  }
}