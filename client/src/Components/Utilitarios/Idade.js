// Transforma data de nascimento em idade
// Como usar
// <Idade nascimento={DIANASCIMENTO}/>
// OBS não sei é correto ser componente algo assim.

const Idade = ({ nascimento }) => {
    return (
        Math.floor((new Date() - new Date(nascimento).getTime()) / 3.15576e+10)
    );
}

export default Idade;

