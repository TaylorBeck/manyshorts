import Image from 'next/image';

const images = [
  { src: 'https://placehold.co/450x800.png', alt: 'Image 1' },
  { src: 'https://placehold.co/450x800.png', alt: 'Image 2' },
  { src: 'https://placehold.co/450x800.png', alt: 'Image 3' },
  { src: 'https://placehold.co/450x800.png', alt: 'Image 4' },
  { src: 'https://placehold.co/450x800.png', alt: 'Image 5' },
  { src: 'https://placehold.co/450x800.png', alt: 'Image 6' }
  // Add more images as needed
];

export default function ImagesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Image Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-3/4 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              className="hover:cursor-pointer hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
