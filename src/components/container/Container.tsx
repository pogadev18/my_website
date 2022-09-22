import { ReactNode } from "react";

const Container = ({children}: { children: ReactNode }) => {
  return (
    <section className="container mx-auto max-w-7xl px-2 py-10 sm:px-6 lg:px-8">
      {children}
    </section>
  )
}

export default Container;