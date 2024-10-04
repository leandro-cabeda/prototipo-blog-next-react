import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Image, Title, Text, Button, TextInput } from '@mantine/core';
import Link from 'next/link';
import { Post } from '@/app/domain';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsAux, setPostsAux] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
        setPostsAux(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const filteredPosts = postsAux?.filter((post: Post) => 
      post.title.toLowerCase().includes(searchTerm?.toLowerCase()) || 
      post.body?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

    setPosts(filteredPosts);

    if(!searchTerm?.trim()?.length) {
      setPosts(postsAux);
    }
  }, [searchTerm]);

  return (
    <Container>
      <TextInput placeholder="Buscar..." className='search-input' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <Link href={'/create'} passHref>
            <Button variant="gradient" className='button'>Criar</Button>
      </Link>
      {posts?.map((post: Post) => (
        <Card key={post.id} shadow="sm" padding="lg" style={{ margin: '20px 0' }}>
          <Image src={`https://via.placeholder.com/300`} alt={post.title} />
          <Title order={2}>{post.title}</Title>
          <Text>{new Date().toLocaleDateString()}</Text>
          <Link href={`/posts/${post.id}`} passHref>
            <Button variant="gradient" className='button-info'>Ler mais...</Button>
          </Link>
        </Card>
      ))}
    </Container>
  );
};

export default Home;
