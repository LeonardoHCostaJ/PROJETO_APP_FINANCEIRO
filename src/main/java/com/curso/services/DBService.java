package com.curso.services;

import com.curso.domains.*;
import com.curso.domains.enums.Situacao;
import com.curso.domains.enums.TipoConta;
import com.curso.domains.enums.TipoLancamento;
import com.curso.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

import static com.curso.domains.enums.PersonType.ADMIN;
import static com.curso.domains.enums.PersonType.USER;

@Service
public class DBService {

    @Autowired
    private BancoRepository bancoRepo;

    @Autowired
    private CentroCustoRepository centroCustoRepo;

    @Autowired
    private ContaRepository contaRepo;

    @Autowired
    private LancamentoRepository lancamentoRepo;

    @Autowired
    private MetaFinanceiraRepository metaFinanceiraRepo;

    @Autowired
    private TerceiroRepository terceiroRepo;

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private PasswordEncoder encoder;

    public void initDB() {

        Banco banco01 = new Banco(null, "Banco do Brasil");

        CentroCusto centroCusto01 = new CentroCusto(null, "Alimentação");

        MetaFinanceira metaFinanceira01 = new MetaFinanceira(null, "Viagem fim do ano Argentina", new BigDecimal("8000.00"), LocalDate.of(2025, 12, 20));

        Terceiro terceiro01 = new Terceiro(null, "Agua na Boca");

        Usuario usuario01 = new Usuario(null, "Leonardo Costa", "leonardocosta@suprasys.com.br",encoder.encode("123456"));
        usuario01.addPersonType(USER);
        usuario01.addPersonType(ADMIN);

        Conta conta01 = new Conta(null, "Conta Corrente do Banco do Brasil", new BigDecimal("1.00"), new BigDecimal("12000.00"), TipoConta.CONTA_CORRENTE, usuario01, banco01, metaFinanceira01);

        Lancamento lancamento01 = new Lancamento(null, "Janta", "1", LocalDate.of(2025, 9, 2), LocalDate.of(2025, 9, 2), LocalDate.of(2025, 9, 2), new BigDecimal("80.00"), new BigDecimal("80.00"), TipoLancamento.DEBITO, Situacao.BAIXADO, terceiro01, centroCusto01, conta01);



        bancoRepo.save(banco01);
        centroCustoRepo.save(centroCusto01);
        metaFinanceiraRepo.save(metaFinanceira01);
        terceiroRepo.save(terceiro01);
        usuarioRepo.save(usuario01);
        contaRepo.save(conta01);
        lancamentoRepo.save(lancamento01);
    }
}
