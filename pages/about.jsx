import Head from 'next/head';

export default function About() {
    return(
        <div className='container'>
            <Head>
                <title>About Us</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="/styles.css" /> 
            </Head>
            <h1>About Us</h1>
        </div>
    )
}