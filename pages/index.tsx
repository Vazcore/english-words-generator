import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useCallback, useState } from 'react';

const Home: NextPage = () => {
  const [numberOfWords, setNumberOfWords] = useState(1);
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [showTextArea, setShowTextArea] = useState(true);
  const title = "English Words Generator";

  const getRandomValue = useCallback((min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  }, []);

  const onGenerate = useCallback(() => {
    const words = text.replaceAll("\n", "").split(" ")
      .map(word => word.replaceAll(`,`, "").replaceAll(".", "").replaceAll("!", ""))
      .filter(word => !word.includes(`"`) && word.length > 3);
    const randomWords: string[] = Array(numberOfWords).fill("").map(() => words[getRandomValue(0, words.length - 1)]);
    setResult(randomWords.join(", "));
  }, [text, numberOfWords, getRandomValue]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {title}
        </h1>

        {showTextArea && <textarea className={styles.textarea} onChange={event => setText(event.target.value)}></textarea>}

        <Stack spacing={2} direction="row" className={styles.buttonPanel}>
          <Button
            onClick={() => setShowTextArea(!showTextArea)}
            color="secondary"
            variant="contained">
              {showTextArea ? "Hide " : "Show "} Text Area
          </Button>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={numberOfWords}
            onChange={event => setNumberOfWords(Number(event.target.value))}
            label="Words"
          >
            <MenuItem value={1}>One word</MenuItem>
            <MenuItem value={2}>Two words</MenuItem>
            <MenuItem value={3}>Three words</MenuItem>
            <MenuItem value={4}>Four words</MenuItem>
            <MenuItem value={5}>Five words</MenuItem>
          </Select>
          <Button
            onClick={onGenerate}
            disabled={text.length === 0}
            variant="contained">
              Get {numberOfWords} Random Word{ numberOfWords > 1 && "s" }
          </Button>
        </Stack>

        <div className={styles.result}>
          {result}
        </div>
        
      </main>

      <footer className={styles.footer}>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Oleksii Inc
        </a>
      </footer>
    </div>
  )
}

export default Home
