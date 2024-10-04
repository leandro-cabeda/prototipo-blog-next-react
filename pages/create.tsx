import { useState } from 'react';
import axios from 'axios';
import { Container, TextInput, Textarea, Button } from '@mantine/core';
import { useRouter } from 'next/router';
import Link from 'next/link';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const router = useRouter();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        axios.post('https://jsonplaceholder.typicode.com/posts', {
            title,
            body,
            image
        })
            .then(response => {
                router.push('/');
            })
            .catch(error => console.error(error));
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <TextInput label="Titulo" className='search-input' value={title} onChange={(e) => setTitle(e.target.value)} />
                <Textarea label="Conteúdo" className='search-input' value={body} onChange={(e) => setBody(e.target.value)} />
                <TextInput label="Imagem URL" className='search-input' value={image} onChange={(e) => setImage(e.target.value)} />
                <Button type="submit" className='button' style={{marginTop: '5px;'}}>Criar Postagem</Button>
            </form>
            <Link href={'/'} passHref style={{marginTop: '10px;'}}>
                <Button variant="gradient" className='button-info'>Voltar</Button>
            </Link>
        </Container>
    );
};

export default CreatePost;
