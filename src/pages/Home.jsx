import React, {useState, useContext } from 'react'
import Navbar from '../components/Navbar'
import Votebanner from '../components/Votebanner'
import UserContext from '../store/UserContext'

function Home() {

  const {ptiCount,juiCount,anpCount,jipCount,pppCount,pmlNCount} = useContext(UserContext);

   
  
  
 

  return (
      <div>
    <Navbar/>

    <div className=' text-center font-serif sm:font-extrabold sm:tracking-widest mt-8 sm:text-4xl'>
      <h1>Voting Application</h1>
    </div>

    <div className=' flex justify-around flex-wrap pb-10'>

        <Votebanner 
          leaderImage={'/nawaz sharif.jfif'}
          partyName={'PML-N'}
          chairman={'Nawaz Sharif'}
          partyFlag={"/noon league flag.jfif"}
          totalVotes={pmlNCount}
          />

        <Votebanner
          leaderImage={'/hafiz naeem ur rahman.jfif'}
          partyName={'JIP'}
          chairman={"Hafiz Naeem-Ur-Rahman"}
          partyFlag={'/jumati islami flag.jfif'}
          totalVotes={jipCount}
        />
        <Votebanner
          leaderImage={'/bilawal butto.jfif'}
          partyName={'PPP'}
          chairman={'Bilawal Bhutto Zardari'}
          partyFlag={'ppp flag.jfif'}
          totalVotes={pppCount}
          />
        <Votebanner
          leaderImage={'/imran khan.jfif'}
          partyFlag={'pti flag.jfif'}
          partyName={'PTI'}
          chairman={'Imran Khan'}
          totalVotes={ptiCount}        />

        <Votebanner
          leaderImage={'/aimal wali.jfif'}
          partyFlag={'anp flag.jfif'}
          partyName={'ANP'}
          chairman={'Aimal Wali Khan'}
          totalVotes={anpCount}
          />

        <Votebanner
          leaderImage={'/moulana.jfif'}
          partyFlag={'jui flag.jfif'}
          partyName={"JUI"}
          chairman={'Maulana Fazl-ur-Rehman'}
          totalVotes={juiCount}
          />

    </div>

    </div>
  )
}

export default Home
