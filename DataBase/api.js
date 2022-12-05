import { useState, useEffect } from "react"

// export const data = () => {

//     const [players,setPlayers] = useState([])
//     const [isLoading, setLoading] = useState(true);

//     useEffect(()=>{

//         const getPlayers = async () => {
//             try {
//                 const response = await fetch('http://127.0.0.1:5000/allplayers');
//                 const json = await response.json();
//                 console.log(json)

//                 setPlayers(json);
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         getPlayers()

//     },[setPlayers])

//      players.map((play)=>{console.log(play.name)})

//     return (players)
// }

export const data = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getPlayers = async () => {
    // try {
    //   const response = await fetch(
    //     'http://192.168.18.53:5000/allplayers'
    //   );
    //   const json = await response.json();
    //   setData(json);
    //   console.log(json)
    // } catch (error) {
    //   console.error(error);
    // }
    console.log('Main Page API called..');

    fetch('http://192.168.18.53:5000/allplayers')
      .then((res) => {
        //console.log('ytrewq');
        return res.json()
      })
      .then((res) => {
        //console.log('qwerty');
        setData(res);
        //console.log(res);
      })
      .catch((err) => {
        console.log('Error: ', err);
        console.error(err);
      })
  }

  useEffect(() => {
    getPlayers();
  }, []);

  return (data)

}
