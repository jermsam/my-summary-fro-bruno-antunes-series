import Link from 'next/link'

export default function Home() {
    return (
   <div>
        <h2>
      Index
      </h2>
     
      <hr/>
      <Link href='/comments'>
     <a>Comments</a>
      </Link>
      <div/>
      <div/>
      <Link href='/login'>
     <a>Login</a>
        </Link>
        <div/>
        <Link href='/faq'>
        <a>Faq</a>
         </Link>
   </div>
    )
  }
  