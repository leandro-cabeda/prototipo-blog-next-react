import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Title, Text, Image, Button } from '@mantine/core';
import { Post } from '@/app/domain';
import Link from 'next/link';

const PostDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        if (id) {
            axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
                .then(response => setPost(response.data))
                .catch(error => console.error(error));
        }
    }, [id]);

    if (!post) return <div>Carregando...</div>;

    return (
        <Container>
            <Image src={`https://via.placeholder.com/600`} alt={post.title} />
            <Title>{post.title}</Title>
            <Text>{post.body}</Text>
            <Link href={'/'} passHref style={{marginBottom: '5px;'}}>
                <Button variant="gradient" className='button-info'>Voltar</Button>
            </Link>
        </Container>
    );
};

export default PostDetails;
