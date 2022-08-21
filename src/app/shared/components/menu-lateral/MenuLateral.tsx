import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useDrawerContext } from "../../contexts";

interface IMenuLateral {
    
    children: React.ReactNode;

}

interface IListItemLinkProps {

    to: string;
    icon: string;
    label: string;
    onClick: (() => void) | undefined;

}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, label, icon, onClick }) => {

    const navigate = useNavigate();

    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false });

    const handleClick = () => {
        navigate(to);
        onClick?.();
    };

    return(
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>

            <ListItemText primary={label} />
        </ListItemButton>
    );

};

export const MenuLateral: React.FC<IMenuLateral> = ({ children }) => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm"));

    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();

    return (
        <>
            <Drawer
                open={isDrawerOpen} 
                variant={smDown ? "temporary" : "permanent"} 
                onClose={toggleDrawerOpen}>
                
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
                    <Box
                        width="100%" 
                        height={theme.spacing(20)} 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center">
                        
                        <Avatar 
                            alt="Doutor Estranho" 
                            src="https://observatoriodocinema.uol.com.br/wp-content/uploads/2022/06/doutor-estranho-19042022-1200x900-1.jpg"
                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                        />
                    </Box>

                    <Divider />

                    <Box flex={1}>
                        <List component="nav">
                            {drawerOptions.map(drawerOptions => (
                                <ListItemLink
                                    to={drawerOptions.path}
                                    key={drawerOptions.path}
                                    icon={drawerOptions.icon}
                                    label={drawerOptions.label}
                                    onClick={smDown ? toggleDrawerOpen: undefined}
                                />
                            ))}
                        </List>
                    </Box>
                </Box>
            </Drawer>

            <Box height="100vh" marginLeft={theme.spacing(28)}>
                {children}
            </Box>
        </>
    );

};