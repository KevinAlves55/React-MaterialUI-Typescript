import { Box, Button, Divider, Icon, Paper, Skeleton, useTheme } from "@mui/material";

interface IFerramentasDeDetalheProps {

    textoBotaoNovo?: string;

    mostrarBotaoNovo?: boolean;
    mostrarBotaoVoltar?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalvarEVoltar?: boolean;

    mostrarBotaoNovoCarregando?: boolean;
    mostrarBotaoVoltarCarregando?: boolean;
    mostrarBotaoApagarCarregando?: boolean;
    mostrarBotaoSalvarCarregando?: boolean;
    mostrarBotaoSalvarEVoltarCarregando?: boolean;

    aoClicarEmNovo?: () => void;
    aoClicarEmVoltar?: () => void;
    aoClicarEmApagar?: () => void;
    aoClicarEmSalvar?: () => void;
    aoClicarEmSalvarEVoltar?: () => void;

}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({

    textoBotaoNovo = "Novo",

    mostrarBotaoNovo = true,
    mostrarBotaoVoltar = true,
    mostrarBotaoApagar = true,
    mostrarBotaoSalvar = true,
    mostrarBotaoSalvarEVoltar = false,

    mostrarBotaoNovoCarregando = false,
    mostrarBotaoVoltarCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoSalvarEVoltarCarregando = false,

    aoClicarEmNovo,
    aoClicarEmVoltar,
    aoClicarEmApagar,
    aoClicarEmSalvar,
    aoClicarEmSalvarEVoltar,

}) => {

    const theme = useTheme();

    return(

        <Box 
            height={theme.spacing(5)}
            marginX={1}
            padding={1}
            paddingX={2}
            display="flex"
            gap={1}
            alignItems="center"
            component={Paper}
        >
            {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
                <Button
                    color="primary"
                    disableElevation
                    variant="contained"
                    startIcon={<Icon>save</Icon>}
                    onClick={aoClicarEmSalvar}
                >
                    Salvar
                </Button>
            )}

            {mostrarBotaoSalvarCarregando && (
                <Skeleton width={110} height={60} />
            )}

            {(mostrarBotaoSalvarEVoltar && !mostrarBotaoSalvarEVoltarCarregando) && (
                <Button
                    color="primary"
                    disableElevation
                    variant="outlined"
                    startIcon={<Icon>save</Icon>}
                    onClick={aoClicarEmSalvarEVoltar}
                >
                    Salvar e voltar
                </Button>
            )}

            {(mostrarBotaoSalvarEVoltarCarregando) && (
                <Skeleton width={180} height={60} />
            )}

            {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
                <Button
                    color="primary"
                    disableElevation
                    variant="outlined"
                    startIcon={<Icon>delete</Icon>}
                    onClick={aoClicarEmApagar}
                >
                    Apagar
                </Button>
            )}

            {mostrarBotaoApagarCarregando && (
                <Skeleton width={110} height={60} />
            )}

            {(mostrarBotaoNovo && !mostrarBotaoApagarCarregando) && (
                <Button
                    color="primary"
                    disableElevation
                    variant="outlined"
                    startIcon={<Icon>add</Icon>}
                    onClick={aoClicarEmNovo}
                >
                    {textoBotaoNovo}
                </Button>
            )}

            {(mostrarBotaoNovoCarregando) && (
                <Skeleton width={110} height={60} />
            )}

            <Divider variant="middle" orientation="vertical"/>

            {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
                <Button
                    color="primary"
                    disableElevation
                    variant="outlined"
                    startIcon={<Icon>arrow_back</Icon>}
                    onClick={aoClicarEmVoltar}
                >
                    Voltar
                </Button>
            )}

            {mostrarBotaoVoltarCarregando && (
                <Skeleton width={110} height={60} />
            )}
        </Box>

    );

};