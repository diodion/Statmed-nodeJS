const formataTelefone = ({ telefone }) => {
    return (
        function telMask(telefone) {
            if (!telefone) return ""
            telefone = telefone.replace(/\D/g, '')
            telefone = telefone.replace(/(\d{2})(\d)/, "($1) $2")
            telefone = telefone.replace(/(\d)(\d{4})$/, "$1-$2")
            return telefone
        }
    )
}

export default formataTelefone;
