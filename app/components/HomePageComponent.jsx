import React from 'react'
import styles from './home.module.css'
import Image from "next/image";
import Link from "next/link";

const HomePageComponent = () => {
  return (
    <div>
      <section className={styles.Main_hero}>
        <div>
          <h1 className={styles.title}>Empowering Futures:</h1>
          <h1 className={styles.title}>Your Path to Success</h1>
          <p className={styles.matter}>Chart your path to success with us. Explore opportunities and unlock your potential.</p>
          <button className={styles.btn_1}>Login</button>
        </div>
        <div>
          <Image src="/hero.svg" width={430} height={464} alt='hero-pic' />
        </div>
      </section>
    </div>
  )
}

export default HomePageComponent
