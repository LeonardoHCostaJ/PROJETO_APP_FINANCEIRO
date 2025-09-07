package com.curso.domains.enums;

public enum Situacao {
    ABERTO(0, "Aberto"),
    BAIXADO(1, "Baixado");

    private final int id;
    private final String descricao;

    Situacao(int id, String descricao) { this.id = id; this.descricao = descricao; }

    public int getId() { return id; }
    public String getDescricao() { return descricao; }

    public static Situacao toEnum(Integer id) {
        if (id == null) return null;
        for (Situacao v : values()) if (v.id == id) return v;
        throw new IllegalArgumentException("Situacao inválida: " + id);
    }

    public static Situacao fromString(String valor) {
        if (valor == null) return null;
        for (Situacao v : values()) {
            if (valor.equalsIgnoreCase(v.name()) || valor.equalsIgnoreCase(v.descricao)) return v;
        }
        throw new IllegalArgumentException("Situacao inválida: " + valor);
    }
}
