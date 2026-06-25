export default function BackgroundBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -left-20 -top-20 h-[400px] w-[400px] rounded-full bg-[#E1BEE7] opacity-40 blur-[100px]" />
      <div className="absolute right-[10%] top-[20%] h-[350px] w-[350px] rounded-full bg-[#F8BBD9] opacity-30 blur-[100px]" />
      <div className="absolute -bottom-20 right-[5%] h-[300px] w-[300px] rounded-full bg-[#E1BEE7] opacity-25 blur-[90px]" />
    </div>
  );
}
