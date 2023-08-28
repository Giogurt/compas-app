import { api } from "compas/utils/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const products = [
  {
    id: 1,
    name: "Hiking Guapo",
    href: "#",
    imageSrc:
      "https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imageAlt: "Front of men's Hiking Guapo in black.",
    price: "$35",
    color: "Mañana",
  },
  {
    id: 2,
    name: "Hiking Guapo",
    href: "#",
    imageSrc:
      "https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imageAlt: "Front of men's Hiking Guapo in Mañana.",
    price: "$35",
    color: "Mañana",
  },
  {
    id: 3,
    name: "Hiking Guapo",
    href: "#",
    imageSrc:
      "https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imageAlt: "Front of men's Hiking Guapo in Mañana.",
    price: "$35",
    color: "Mañana",
  },
  {
    id: 4,
    name: "Hiking Guapo",
    href: "#",
    imageSrc:
      "https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imageAlt: "Front of men's Hiking Guapo in Mañana.",
    price: "$35",
    color: "Mañana",
  },
  {
    id: 5,
    name: "Hiking Guapo",
    href: "#",
    imageSrc:
      "https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imageAlt: "Front of men's Basic Tee in Mañana.",
    price: "$35",
    color: "Mañana",
  },
  // More products...
];

export default function ExperiencesPage() {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);

  const {
    data: experiences,
    isLoading,
    refetch,
  } = api.experiences.getExperiences.useQuery(
    {
      latitude: location?.latitude,
      longitude: location?.longitude,
    },
    { enabled: !!location }
  );

  // if (location && !experiences) {
  //   refetch();
  // }
  console.log(location);

  console.log(experiences);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(position.coords);
    });
  }, []);

  return (
    <div className="py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto"
          src="/logo.png"
          width={200}
          height={200}
          alt="Compas"
        />
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Experiencias cerca de ti
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {experiences?.map((experience) => (
            <div key={experience.id} className="group relative rounded-sm">
              {/* <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow">
                <a href="#">
                  <img
                    className="rounded-t-lg"
                    src="https://unsplash.com/photos/BKLHxgbYFDI"
                    alt=""
                  />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      Hiking Guapo
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 ">
                    Muy bonito muy lindo
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Ver más
                    <svg
                      className="ml-2 h-3.5 w-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
              </div> */}

              <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <img
                  src={experience.photo}
                  alt={experience.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {experience.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {dayjs(experience.date).fromNow()}
                  </p>
                </div>
                <p className="mr-2 text-sm font-medium text-gray-900">
                  {`Se buscan ${experience.maxCompas} compas`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
