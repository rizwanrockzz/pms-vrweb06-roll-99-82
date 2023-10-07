"use client"
import React from 'react'
import styles from './home.module.css'
import Image from "next/image";


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
      <section className={styles.Main_logo}>
        <div className={styles.com}>
          <p className={styles.com_p}>Companies Rely on</p>
          <strong>Our Graduates:</strong>
        </div>
        <div className={styles.slider}>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <Image src="/c1.jpeg" width={200} height={70} className={styles.img}/>
            </li>
            <li className={styles.li}>
              <Image src="/c3.png" width={200} height={70} className={styles.img} />
            </li>
            <li className={styles.li}>
              <Image src="/c2.png" width={200} height={70} className={styles.img}/>
            </li>
            <li className={styles.li}>
              <Image src="/c5.png" width={200} height={70} className={styles.img} />
            </li>
            <li className={styles.li}>
              <Image src="/c6.png" width={200} height={70} className={styles.img}/>
            </li>
            <li className={styles.li}>
              <Image src="/c7.png" width={200} height={70} className={styles.img} />
            </li>
            <li className={styles.li}>
              <Image src="/c8.png" width={200} height={70} className={styles.img} />
            </li>
            <li className={styles.li}>
              <Image src="/c9.png" width={200} height={70} className={styles.img}/>
            </li>
            <li className={styles.li}>
              <Image src="/c10.png" width={200} height={70} className={styles.img} />
            </li>
            <li className={styles.li}>
              <Image src="/c11.png" width={200} height={70} className={styles.img} />
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default HomePageComponent
