
import {GetStaticProps} from 'next'
import { openDB} from 'model/openDb'
import { FaqModal } from 'model/Faq'
import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';




export default function Faq({faqs}:FaqProps) {
   

    return <div>
        {faqs.map( ({id,question,answer})=><ExpansionPanel key={id} >
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant='h6'>
              {question}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {answer}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
    
)}
    </div>
}

interface FaqProps{
    faqs:FaqModal[]
}


export const getStaticProps: GetStaticProps = async () => {
  
    const db = await openDB()
    const faqs = await db.all('SELECT * FROM FAQ ORDER BY createDate DESC')

    return {props:{faqs}}
}