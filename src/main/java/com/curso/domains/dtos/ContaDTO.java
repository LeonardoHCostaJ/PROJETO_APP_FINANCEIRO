package com.curso.domains.dtos;

import com.curso.domains.*;
import com.curso.domains.enums.TipoConta;
import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.Objects;

public class ContaDTO {

    private Long id;

    @NotNull(message = "O campo descricao não pode ser nulo")
    @NotBlank(message = "O campo descircao não pode ser vazio")
    private String descricao;

    private int tipoConta;

    @NotNull
    @Column(precision = 11, scale = 2)
    @Digits(integer = 9,fraction = 2)
    private BigDecimal saldo;

    @NotNull
    @Column(precision = 11, scale = 2)
    @Digits(integer = 9,fraction = 2)
    private BigDecimal limite;

    @ManyToOne
    @JoinColumn(name = "idusuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "idbanco")
    private Banco banco;

    @ManyToOne
    @JoinColumn(name = "idmetafinanceira")
    private MetaFinanceira metaFinanceira;

    public ContaDTO() {
    }

    public ContaDTO(Conta conta) {
        this.id = conta.getId();
        this.descricao = conta.getDescricao();
        this.tipoConta = conta.getTipoConta().getId();
        this.saldo = conta.getSaldo();
        this.limite = conta.getLimite();
        this.usuario = conta.getUsuario();
        this.banco = conta.getBanco();
        this.metaFinanceira = conta.getMetaFinanceira();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotNull(message = "O campo descricao não pode ser nulo") @NotBlank(message = "O campo descircao não pode ser vazio") String getDescricao() {
        return descricao;
    }

    public void setDescricao(@NotNull(message = "O campo descricao não pode ser nulo") @NotBlank(message = "O campo descircao não pode ser vazio") String descricao) {
        this.descricao = descricao;
    }

    public int getTipoConta() {
        return tipoConta;
    }

    public void setTipoConta(int tipoConta) {
        this.tipoConta = tipoConta;
    }

    @NotNull
    @Digits(integer = 9, fraction = 2)
    public BigDecimal getSaldo() {
        return saldo;
    }

    public void setSaldo(@NotNull @Digits(integer = 9, fraction = 2) BigDecimal saldo) {
        this.saldo = saldo;
    }

    @NotNull
    @Digits(integer = 9, fraction = 2)
    public BigDecimal getLimite() {
        return limite;
    }

    public void setLimite(@NotNull @Digits(integer = 9, fraction = 2) BigDecimal limite) {
        this.limite = limite;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Banco getBanco() {
        return banco;
    }

    public void setBanco(Banco banco) {
        this.banco = banco;
    }

    public MetaFinanceira getMetaFinanceira() {
        return metaFinanceira;
    }

    public void setMetaFinanceira(MetaFinanceira metaFinanceira) {
        this.metaFinanceira = metaFinanceira;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ContaDTO contaDTO = (ContaDTO) o;
        return Objects.equals(id, contaDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}