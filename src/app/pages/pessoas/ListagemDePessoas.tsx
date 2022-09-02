import { useEffect, useMemo, useState } from "react";
import { LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { FerramentasDeListagem } from "../../shared/components";
import { UseDebounce } from "../../shared/hooks";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasService, IListagemPessoa } from "../../shared/services/api/pessoas/PessoasService";
import { Environment } from "../../shared/environments";

export const ListagemDePessoas: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();  
    const { debounce } = UseDebounce();

    const [rows, setRows] = useState<IListagemPessoa[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    const busca = useMemo(() => {

        return searchParams.get("busca") || "";
    
    }, [searchParams]);

    const pagina = useMemo(() => {

        return searchParams.get("pagina") || "1";
    
    }, [searchParams]);

    useEffect(() => {

        setIsLoading(true);

        debounce(() => {

            PessoasService.getAll(Number(pagina), busca).then((result) => {

                setIsLoading(false);
    
                if (result instanceof Error) {
    
                    alert(result.message);
                    
                } else {

                    console.log(result);                    
    
                    setRows(result.data);
                    setTotalCount(result.totalCount);
    
                }
            
            });

        });
        

    }, [busca, pagina]);

    return(
        <LayoutBaseDePagina 
            titulo="Listagem de pessoas"
            barraDeFerramentas={
                <FerramentasDeListagem
                    mostrarInputBusca
                    textoDaBusca={busca}
                    textoBotaoNovo="Nova"
                    aoMudarTextoDeBusca={texto => setSearchParams(
                        { busca: texto, pagina: "1" },
                        { replace: true }
                    )}
                />
            }
        >

            <TableContainer
                component={Paper} 
                variant="outlined" 
                sx={{ 
                    m: 1,
                    width: "auto"
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome Completo</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        
                        {
                            rows.map(({ id, nomeCompleto, email }) => (
                                <TableRow key={id}>
                                    <TableCell>Ações</TableCell>
                                    <TableCell>{nomeCompleto}</TableCell>
                                    <TableCell>{email}</TableCell>
                                </TableRow>
                            ))
                        }

                    </TableBody>

                    {totalCount === 0 && !isLoading && (
                        <caption>{Environment.LISTAGEM_VAZIA}</caption>
                    )}

                    <TableFooter>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3}>                                    
                                    <LinearProgress variant="indeterminate"/>
                                </TableCell>
                            </TableRow>
                        )}

                        {(totalCount > Environment.LIMITES_DE_LINHAS) && (
                            <TableRow>
                                <TableCell colSpan={3}>                                    
                                    <Pagination
                                        page={Number(pagina)}
                                        count={Math.ceil(totalCount / Environment.LIMITES_DE_LINHAS)}
                                        onChange={(_, newPage) => setSearchParams(
                                            { busca, pagina: newPage.toString() }, 
                                            { replace: true }
                                        )}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>

        </LayoutBaseDePagina>
    );

};