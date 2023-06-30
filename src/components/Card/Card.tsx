import React from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'

interface ICard {
  fullName: string,
  description: string,
  stargazers: string,
  language: string,
  topics: Array<string>
}

const Card = (props: ICard) => {
  return (
    <div className={styles.content} data-testid="card">
      <div>
        <Link target={'_blank'} href={`https://github.com/${props.fullName}`}>{props.fullName}</Link>
        <span>{props.description}</span>
      </div>
      <div className={styles.topics}>
        {
          props.topics.map((item, index) => (
            <Link target={'_blank'} href={`https://github.com/topics/${item}`} key={index}>{item}</Link>
          ))
        }
      </div>
      {
        props.language ?
          <div>
            <span>{props.language}</span>
          </div>
          : <></>
      }
    </div>
  )
}

export default Card