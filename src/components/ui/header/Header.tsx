import { faContactCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  return (
    <div className="bg-[--background] w-screen h-[100%] min-h-[15vh] max-w-[100vw] flex items-center justify-center">
      <FontAwesomeIcon
        icon={faContactCard}
        className="h-24 w-24 rounded-full text-[--primary] bg-[--foreground] p-8 rotate-[-10deg] px-2 text-color1"
      />
      <div className="text-3xl px-3 italic font-bold">
        Contact Card App</div>
    </div>
  );
}
// export default function Header() {
//     return (
//         <h1 className="flex bg-[var(--container)] w-full justify-center items-center rounded-sm drop-shadow-lg text-[var(--primary)] text-4xl p-4 border">
//             Contact Cards
//         </h1>
//     );
// };
