package com.curso.domains.enums;

public enum TipoLancamento {
    CREDITO(0, "Crédito"),
    DEBITO(1, "Débito");

    private final int id;
    private final String descricao;

    TipoLancamento(int id, String descricao) { this.id = id; this.descricao = descricao; }

    public int getId() { return id; }
    public String getDescricao() { return descricao; }

    public static TipoLancamento toEnum(Integer id) {
        if (id == null) return null;
        for (TipoLancamento v : values()) if (v.id == id) return v;
        throw new IllegalArgumentException("Tipo de Lançamento inválido: " + id);
    }

    public static TipoLancamento fromString(String valor) {
        if (valor == null) return null;
        for (TipoLancamento v : values()) {
            if (valor.equalsIgnoreCase(v.name()) || valor.equalsIgnoreCase(v.descricao)) return v;
        }
        throw new IllegalArgumentException("Tipo de Lançamento inválido: " + valor);
    }
}
