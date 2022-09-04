import { LinearProgress, TextField } from "@mui/material";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FerramentasDeDetalhe } from "../../shared/components";
import { VTextField } from "../../shared/forms";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

interface IFormData {

    email: string
    cidadeId: number
    nomeCompleto: string

}

export const DetalhesDePessoas: React.FC<IFormData> = () => {

    const { id = "nova" } = useParams<"id">();
    const navigate = useNavigate();

    const formRef = useRef<FormHandles>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState("");

    useEffect(() => {

        if (id !== "nova") {

            setIsLoading(true);
            
            PessoasService.getById(Number(id)).then((result) => {

                if (result instanceof Error) {
                    
                    alert(result.message);
                    navigate("/pessoas");

                } else {

                    setNome(result.nomeCompleto);
                    console.log(result);

                }

            });

        }

    }, [id]);

    const handleSave = (dados: IFormData) => {

        PessoasService.create(dados).then((result) => {

            if (result instanceof Error) {
                
                alert("Erro ao cadastrar pessoa");

            } else {

                alert("Pessoa cadastrada com sucesso");
                navigate("/pessoas");

            }

        });

    };

    const handleDelete = (id: number) => {

        if (confirm("Realmente deseja apagar?")) {

            PessoasService.deleteById(id).then(result => {

                if (result instanceof Error) {
    
                    alert(result.message);
                    
                } else {

                    alert("Registro deletado com sucesso");
                    navigate("/pessoas");

                }
            
            });
        
        }     

    };

    return(

        <LayoutBaseDePagina
            titulo={id === "nova" ? "Nova pessoa" : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe 
                    textoBotaoNovo="Nova"
                    mostrarBotaoSalvarEVoltar
                    mostrarBotaoNovo={id !== "nova"}
                    mostrarBotaoApagar={id !== "nova"}

                    aoClicarEmSalvar={() => formRef.current?.submitForm()}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
                    aoClicarEmVoltar={() => navigate("/pessoas")}
                    aoClicarEmSalvarEVoltar={() => formRef.current?.submitForm()}
                />
            }
        >

            <Form ref={formRef} onSubmit={(dados) => handleSave(dados)}>
                
                <VTextField name="NomeCompleto" />
                <VTextField name="email" />
                <VTextField name="cidadeId" />

            </Form>
            
        </LayoutBaseDePagina>

    );

};