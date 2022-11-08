import { useState } from "react";

interface Props {
  close: () => void;
}

export const Share = ({ close }: Props) => {
  const [isCopied, setIsCopied] = useState(false);
  const link = window.location.href;

  const linkOnClick = () => {
    navigator?.clipboard?.writeText?.(link).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    });
  };

  return (
    <section className="bg-yellow-200 mb-4 p-4 rounded shadow-inner">
      <span>Share this link with your friends and start arranging your activity together!</span>
      <p className="text-sm mt-3 opacity-50">
        {isCopied ? "✅ Copied" : "😉 Click to copy"}
      </p>
      <p className="font-semibold mb-3" onClick={linkOnClick}>
        {link}
      </p>
      <p className="italic text-sm">
        Note: Be careful who you share this link with. Anyone with this link has full access to the activity information and can apply changes.
      </p>
      <button className="block mt-3 ml-auto text-sm" onClick={close}>Close x</button>
    </section>
  );
};
