import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "@/components/meetups/MeetupDetail";

export default function MeetupDetails(props) {
    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description} />
            </Head>
            <MeetupDetail {...props.meetupData} />
        </>
    )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect("mongodb+srv://fuadIsayev:MCnhwPl2x7dCT7k0@cluster0.mj2wcxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    const db = client.db();

    const meetupCollections = db.collection("meetups");

    const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: "blocking",
        paths: meetups.map((meetup) => ({
            params: {
                meetupId: meetup._id.toString()
            }
        }))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect("mongodb+srv://fuadIsayev:MCnhwPl2x7dCT7k0@cluster0.mj2wcxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    const db = client.db();

    const meetupCollections = db.collection("meetups");

    const selectedMeetup = await meetupCollections.findOne({ _id: new ObjectId(meetupId) })

    return {
        props: {
            meetupData: {
                ...selectedMeetup,
                _id: null,
            }
        }
    }
}