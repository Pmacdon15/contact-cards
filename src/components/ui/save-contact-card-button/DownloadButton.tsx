'use client';
import { saveAs } from 'file-saver';
import { ContactInfo} from '@/types/types';

export default function DownloadButton({ contactInfo, contactName }: { contactInfo: ContactInfo[], contactName: string }) {
    const handleDownload = () => {
        try {
            let vCardData = `BEGIN:VCARD
            VERSION:3.0
            FN:${contactName}
            `;
            contactInfo.forEach((info) => {
                let type = '';
                switch (info.type) {
                    case 1:
                        type = 'TEL';
                        break;
                    case 2:
                        type = 'EMAIL';
                        break;
                    case 3:
                        const addressParts = info.value.split(',').map(part => part.trim());
                        const formattedAddress = addressParts.join(';');
                        vCardData += `ADR;TYPE=${info.name}:${formattedAddress}\n`;
                        break;
                    case 4:
                        type = 'URL';
                        break;
                    // case 5:
                    //     type = 'DATE';
                    //     break;
                    default:
                        type = 'NOTE';
                }

                vCardData += `${type};TYPE=${info.name}:${info.value}
`;
            });

            vCardData += `END:VCARD`;

            console.log('vCardData:', vCardData);

            const blob = new Blob([vCardData], { type: 'text/vcard' });
            saveAs(blob, `${contactName}.vcf`);
        } catch (error) {
            console.error('Error generating or saving vCard:', error);
        }
    };

    return (
        <button className="bg-[var(--container)] text-[var(--primary)] shadow-lg p-4 text-xl" onClick={handleDownload}>
            Download Contact Card
        </button>
    );
};