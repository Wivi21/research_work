'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';

export const HomeHero = () => {
  return (
    <div className="bg-blue-600 text-white h-screen flex flex-col justify-center items-center space-y-6 px-4">
      <motion.h1
        className="text-5xl font-bold text-center"
        initial={{ y: -150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Planifica Tu Aventura a Menorca
      </motion.h1>
      <motion.p
        className="text-xl text-center max-w-md"
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Descubre la belleza de Menorca desde el mar. Comienza tu viaje con nosotros.
      </motion.p>
      <Link href="/planning" passHref>
        <motion.p
          className="inline-block bg-white text-blue-600 font-semibold py-3 px-10 rounded-full shadow-lg hover:shadow-xl transition duration-300 hover:bg-blue-700 hover:text-white"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.8 }}
        >
          Planificar Viaje
        </motion.p>
      </Link>
    </div>
  );
}
