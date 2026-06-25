export default function FormCard({
  
  title,
  children,
  className = "",
}) {
  return (
    <div
      className={`rounded-[24px]   px-6 py-6  ${className}`}
    >
      <h2 className="mt-2 text-[20px] font-bold text-[#212121]">{title}</h2>
      <div className="mt-2">{children}</div>
    </div>
  );
}
