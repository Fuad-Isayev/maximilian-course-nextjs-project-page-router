import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";

import NewMeetupForm from "@/components/meetups/NewMeetupForm";

export default function NewMeetupPage() {
    const router = useRouter();

    async function addMeetupHandler(enteredMeetupData) {
        const response = await axios.post('/api/new-meetup', enteredMeetupData);
        console.log(response.data);
        router.push("/");   
    }

    return (
        <>
            <Head>
                <title>Add a new Meetup</title>
                <meta name="description" content="Create your own meetup and find great networking opportunities!" />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    )
}