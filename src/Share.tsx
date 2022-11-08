interface Props {
  close: () => void;
}

export const Share = ({ close }: Props) => {
  return (
    <section className="bg-yellow-200 mb-4 p-4 rounded shadow-inner">
      <span>Share this link with your friends and start arranging your activity together!</span>
      <p className="font-semibold my-3">
        {window.location.href}
      </p>
      <p className="italic text-sm">
        Note: Be careful who you share this link with. Anyone with this link has full access to the activity information and can apply changes.
      </p>
      <button className="block mt-3 ml-auto text-sm" onClick={close}>Close x</button>
    </section>
  );
};
