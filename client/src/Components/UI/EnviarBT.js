import { ReactComponent as Carregamento } from './../../Assets/img/svg/icons/carregando.svg'

const EnviaBT = ({ className, onSubmit, text, loading = false, disabled }) => {
  return (
    <button className={className} onClick={onSubmit} disabled={disabled}>
      {!loading ? text : <Carregamento className="animacao-carregamento" />}
    </button>
  )
}

export default EnviaBT

// Botão - use state
// const [showLoader, setShowLoader] = useState(false)
// No submit colocar
// setShowLoader(true)
// setTimeout(() => setShowLoader(false), 1000)