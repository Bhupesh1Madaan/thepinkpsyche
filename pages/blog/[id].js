import { useRouter } from "next/router";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function BlogDetail() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <Navbar />
            <main className="p-10 text-center">
                <h1 className="text-3xl font-bold mb-4">Blog #{id}</h1>
                <p>
                    This is the detailed content of blog post with ID: {id}.
                    Later we will fetch actual blog content from CMS.
                </p>
            </main>
            <Footer />
        </>
    );
}
