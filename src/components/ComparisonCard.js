import React from 'react'
import { connect } from 'react-redux'
import '../styles/main.css'
import '../styles/comparisonModal.css'

const ComparisonCard = (props) => {
  return(
    <div> 
      <div className={ 'comparison-card' + (props.comparison.length === 1 ? ' open-comparison' : '') }>
        <h4 className='comparison-header'>Comparing pokemon</h4>
         {
         props.comparison.length === 1 ? 
            <div className='comparison-item' key={ props.comparison[0].id}>
              { props.comparison[0].name.toUpperCase()}
            </div>
            : ''
          }
      </div>
    </div>  
    )
}

export default connect((state) => {
  return state
})(ComparisonCard)