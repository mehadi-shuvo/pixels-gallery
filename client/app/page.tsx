import ImageCard from "@/components/cards/ImageCard";

export default function Home() {
  return (
    <div className="my-10 grid items-center justify-center grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-4/5 mx-auto">
      <ImageCard></ImageCard>
      <ImageCard></ImageCard>
      <ImageCard></ImageCard>
      <ImageCard></ImageCard>
      <ImageCard></ImageCard>
      <ImageCard></ImageCard>
      <ImageCard></ImageCard>
    </div>
  );
}
