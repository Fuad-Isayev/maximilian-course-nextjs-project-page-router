import { MongoClient } from "mongodb";
import Head from "next/head";

import MeetupList from "@/components/meetups/MeetupList";
// import { getServerSideProps } from "next/dist/build/templates/pages";


export default function HomePage(props) {
    return <>
        <Head>
            <title>React Meetups</title>
            <meta name="description" content="Browse highly active React meetups!" />
        </Head>
        <MeetupList meetups={props.meetups} />
    </>
}

// export async function getServerSideProps(context) {
//     //data fetching from API
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }

// }

export async function getStaticProps() {
    //data fetching from API
    const client = await MongoClient.connect("mongodb+srv://fuadIsayev:MCnhwPl2x7dCT7k0@cluster0.mj2wcxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    const db = client.db();

    const meetupCollections = db.collection("meetups");
    const meetups = await meetupCollections.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 1
    }
}