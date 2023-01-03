import Image from 'next/image'

import backgroundImage from './../images/background-call-to-action.jpg'
import { Container } from './Container'
import { Button } from './Button'

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-blue-600 py-32 w-full"
    >
      <Image
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
      <Container className="relative" >
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Try it for free today
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            It’s time to take control of your time. Sumari is the best way to learn from YouTube videos 10x faster. Get started today.
          </p>
          <Button href="/register" color="white" className="mt-10" >
            Try it for free
          </Button>
        </div>
      </Container>
    </section>
  )
}
