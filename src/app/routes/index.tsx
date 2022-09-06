import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";

import { 
	Dashborad, 
	DetalhesDeCidades, 
	DetalhesDePessoas, 
	ListagemDeCidades, 
	ListagemDePessoas 
} from "../pages";

export const AppRoutes = () => {

	const { setDrawerOptions } = useDrawerContext();

	useEffect(() => {
		setDrawerOptions([
			{
				icon: "home",
				path: "/pagina-inicial",
				label: "HOME",
			},
			{
				icon: "people",
				path: "/pessoas",
				label: "PESSOAS"
			},
			{
				icon: "location_city",
				path: "/cidades",
				label: "CIDADES"
			}
		]);
	}, []);

	return(

		<Routes>
			<Route 
				path="/pagina-inicial" 
				element= { 
					<Dashborad /> 
				}
			/>

			<Route 
				path="/pessoas" 
				element= { 
					<ListagemDePessoas /> 
				}
			/>

			<Route 
				path="/pessoas/detalhe/:id"
				element={
					<DetalhesDePessoas />
				}
			/>

			<Route 
				path="/cidades" 
				element= { 
					<ListagemDeCidades /> 
				}
			/>

			<Route 
				path="/cidades/detalhe/:id"
				element={
					<DetalhesDeCidades />
				}
			/>

			<Route path="*" element={<Navigate to="/pagina-inicial" />} />
		</Routes>

	);

};