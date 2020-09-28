export const closeModal = (modalNumber) => {
  const backdrop = document.getElementsByClassName('backdrop')[modalNumber]
  const modal = document.getElementsByClassName('modal')[modalNumber]
  if(modal.classList.contains('open')){
    modal.classList.remove('open');
    backdrop.classList.remove('open');
  }
}

export const activeModal = (modalNumber) => {
  const backdrop = document.getElementsByClassName('backdrop')[modalNumber]
  const modal = document.getElementsByClassName('modal')[modalNumber]
  if(modal){
    backdrop.classList.add('open')
    modal.classList.add('open')
  }   
}

export const activeComparisonCard = () =>{
  const comparisonCard = document.getElementsByClassName('comparison-card')[0]
  comparisonCard.classList.add('open-comparison')
}

export const closeComparisonCard = () =>{
  const comparisonCard = document.getElementsByClassName('comparison-card')[0]
  if(comparisonCard.classList.contains('open-comparison')){
    comparisonCard.classList.remove('open-comparison')
  }
}

export const getGender = (genderRate) => {
  if(genderRate<=4){
    return 'Male'
  } else {
    return 'Female'
  }
}
