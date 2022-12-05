import { useState, useEffect } from "react"
import {db} from './firebase-config'
import {collection, getDocs, addDoc, updateDoc, doc} from 'firebase/firestore'

const collectionRef = collection(db, "players")

export const data = () => {
  
  const [players,setPlayers] = useState([])
  
   useEffect(()=>{
    
    const getPlayers = async () => {
      const data = await getDocs(collectionRef)
      setPlayers(data.docs.map((doc) => ({... doc.data(), id:doc.id })))
    }
    getPlayers()
    
   },[setPlayers])

  // players.map((play)=>{console.log(play.name)})

  return (players)
}

export const addData = () => {
  const player = [
    {
      name: 'BABAR AZAM',
      picSource: require('../assets/babarAzam.jpg'),
      type: 'Batsman',
      country: 'Pakistan',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
    {
      name: 'BEN STOKES',
      picSource: require('../assets/benStokes.jpg'),
      type: 'Batsman',
      country: 'Pakistan',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
    {
      name: 'GLENN MAXWELL',
      picSource: require('../assets/glennMaxwell.jpg'),
      type: 'Batsman',
      country: 'Pakistan',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
    {
      name: 'GLENN PHILLIPS',
      picSource: require('../assets/glennPhillips.jpg'),
      type: 'Batsman',
      country: 'Pakistan',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
    {
      name: 'HARSHAL PATEL',
      picSource: require('../assets/harshalPatel.jpg'),
      type: 'Batsman',
      country: 'Pakistan',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
    {
      name: 'LIAM LIVINGSTONE',
      picSource: require('../assets/liamLivingstone.jpg'),
      type: 'Batsman',
      country: 'Pakistan',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
    {
      name: 'MUHAMMAD RIZWAN',
      picSource: require('../assets/m.rizwan.jpg'),
      type: 'Batsman',
      country: 'Pakistan',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
    {
      name: 'MOEEN ALI',
      picSource: require('../assets/moeenAli.jpg'),
      type: 'Batsman',
      country: 'Pakistan',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
    {
      name: 'MUSTAFIZUR RAHMAN',
      picSource: require('../assets/mustafizurRahman.jpg'),
      type: 'Batsman',
      country: 'Pakistan',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
    {
      name: 'RASHID KHAN',
      picSource: require('../assets/rashidKhan.jpg'),
      type: 'Batsman',
      country: 'Pakistan',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
    {
      name: 'SHAHEEN AFRIDI',
      picSource: require('../assets/shaheenAfridi.jpg'),
      type: 'Batsman',
      country: 'Pakistan',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
    {
      name: 'WAINDU HASARANGA',
      picSource: require('../assets/waninduHasaranga.jpg'),
      type: 'Batsman',
      country: 'Pakistan',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
  ];
  
  
    const StorePlayer = async () =>{
       await player.map((player)=>{  addDoc(collectionRef,player)
       })
    }
  
  StorePlayer()

}



