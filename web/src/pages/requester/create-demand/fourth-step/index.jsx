import React from "react";

// MUI
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button
} from "@mui/material";

// Icons
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

export default function FourthStep({props}) {
    return (
        <div>
            <Dialog
                open={props.confirmDemand}
                onClose={props.handleCloseConfirm}
                sx={{
                    "& .MuiDialog-paper": {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "23rem",
                        height: "15rem",
                        backgroundColor: "#fff",
                        boxShadow: 0,
                        borderRadius: 2,
                    },
                }}
            >
                <div className="grid items-center justify-center">
                    <div className="flex items-center justify-center">
                        <WarningAmberRoundedIcon
                            sx={{
                                fontSize: "5rem",
                                color: "#0075B1",
                            }}
                        />
                    </div>
                    <DialogTitle style={{ color: "#0075B1" }}>
                        {props.anyEmptyField ? (
                            <>
                                <span>Existem campos vazios!</span>
                                <br />
                                <span className="flex items-center justify-center">
                                    Deseja prosseguir?
                                </span>
                            </>
                        ) : (
                            <>
                                Têm certeza que deseja <br />
                                <span>criar uma nova demanda?</span>
                            </>
                        )}
                    </DialogTitle>
                </div>
                <DialogActions>
                    <div className="flex gap-5">
                        <Button
                            autoFocus
                            onClick={props.handleCloseConfirm}
                            sx={{
                                backgroundColor: "#C2BEBE",
                                color: "#fff",
                                "&:hover": {
                                    backgroundColor: "#C2BEBE",
                                },
                            }}
                        >
                            Cancelar
                        </Button>
                        {/* <Link to="/minhas-demandas"> */}
                        <Button
                            onClick={() => props.handleCreateDemand(true)}
                            sx={{
                                backgroundColor: "#0075B1",
                                color: "#fff",
                                "&:hover": {
                                    backgroundColor: "#0075B1",
                                },
                            }}
                        >
                            {
                                <span className="flex items-center justify-center">
                                    {props.anyEmptyField ? "Prosseguir" : "Criar demanda"}
                                </span>
                            }
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
};