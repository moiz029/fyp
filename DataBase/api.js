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
      //  try {
        // const response = await fetch('http://192.168.100.133:5000/allplayers');
        // const json = await response.json();
        // console.log(json)
        // setData(json);
        console.log('Main Page API called..');

        fetch('http://172.20.10.11:5000/allplayers')
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

        // const json = await response.json();
      //   console.log(json)
      //   setData(json);


      // } catch (error) {
      //   console.error(error);
      // } finally {
      //   setLoading(false);
      // }
    }
  
    useEffect(() => {
      getPlayers();
    }, []);

    return (data)

}
