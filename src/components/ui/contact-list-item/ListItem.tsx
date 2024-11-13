import { ContactInfo } from "@/types/types";
import Image from "next/image";

export default function ListItem({
  info,
  index,
  typeName,
  isEditing,
}: {
  info: ContactInfo;
  index: number;
  typeName: string;
  isEditing: boolean;
}) {

  return !isEditing ? (
    <li
      key={index}
      className="bg-container text-foreground text-base shadow-lg p-2 items-center rounded-md break-words"
    >
      {/* {typeName}: <br /> */}
      {info.type === 1 && (
        <div className="flex justify-center items-center">
          <div className="rounded-lg bg-green-600 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="white"
              className="size-14 p-2"
            >
              <path
                fillRule="evenodd"
                d="m3.855 7.286 1.067-.534a1 1 0 0 0 .542-1.046l-.44-2.858A1 1 0 0 0 4.036 2H3a1 1 0 0 0-1 1v2c0 .709.082 1.4.238 2.062a9.012 9.012 0 0 0 6.7 6.7A9.024 9.024 0 0 0 11 14h2a1 1 0 0 0 1-1v-1.036a1 1 0 0 0-.848-.988l-2.858-.44a1 1 0 0 0-1.046.542l-.534 1.067a7.52 7.52 0 0 1-4.86-4.859Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <a
            href={`tel:${info.value.replace(/-/g, "")}`}
            className="block w-full h-full"
          >
            {info.value}
          </a>
        </div>
      )}
      {info.type === 2 && (
        <div className="flex justify-center items-center">
          <div className="rounded-lg bg-foreground mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="white"
              className="size-14 p-2"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
          </div>

          <a className="block w-full h-full" href={`mailto:${info.value}`}>
            {info.value}
          </a>
        </div>
      )}
      {info.type === 3 && (
        <a
          className="block w-full h-full"
          href={`https://www.google.com/maps/search/${info.value}`}
        >
          {info.value}
        </a>
      )}
      {info.type === 4 && (
        <div className="flex justify-center items-center">
          <div className="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-14 p-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
          </div>

          <a className="block w-full h-full" href={info.value} target="_blank">
            {info.value}
          </a>
        </div>
      )}
      {info.type === 6 && (
        <div className="flex justify-center items-center">
          <div className="mr-4">
            <Image src='/linkedinIcon.png' width={56} height={56} alt="Picture of the author"/>
          </div>

          <a className="block w-full h-full" href={'https://www.linkedin.com/in'+info.value} target="_blank">
            {info.value}
          </a>
        </div>
      )}
      {info.type === 7 && (
        <div className="flex justify-center items-center">
          <div className="mr-4">
            <Image src='/githubIcon.png' width={56} height={56} alt="Picture of the author"/>
          </div>

          <a className="block w-full h-full" href={'https://www.github.com'+info.value} target="_blank">
            {info.value}
          </a>
        </div>
      )}
    </li>
  ) : (
    <li
      key={index}
      className="bg-[var(--container)] text-foreground p-2 items-center hover:scale-105 rounded-md flex w-full"
    >
      {typeName}:
      <br />
      <textarea
        name={info.id.toString()}
        defaultValue={info.value}
        className="bg-[var(--container)] text-foreground border w-full h-full items-center hover:scale-105 rounded-md"
      />
    </li>
  );
}
