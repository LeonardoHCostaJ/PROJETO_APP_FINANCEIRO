package com.curso.domains.enums;

public enum TipoConta {
    CONTA_CORRENTE(0, "Conta Corrente"),
    CONTA_INVESTIMENTO(1, "Conta Investimento"),
    CARTAO_CREDITO(2, "Cartão de Crédito"),
    CARTAO_ALIMENTACAO(3, "Cartão Alimentação"),
    POUPANCA(4, "Poupança");

    private final int id;
    private final String descricao;

    TipoConta(int id, String descricao) { this.id = id; this.descricao = descricao; }

    public int getId() { return id; }
    public String getDescricao() { return descricao; }

    public static TipoConta toEnum(Integer id) {
        if (id == null) return null;
        for (TipoConta v : values()) if (v.id == id) return v;
        throw new IllegalArgumentException("TipoConta inválido: " + id);
    }

    public static TipoConta fromString(String valor) {
        if (valor == null) return null;
        for (TipoConta v : values()) {
            if (valor.equalsIgnoreCase(v.name()) || valor.equalsIgnoreCase(v.descricao)) return v;
        }
        throw new IllegalArgumentException("TipoConta inválido: " + valor);
    }
}
