// Interfaces de Identidade para casos de uso
import type { IRegisterIdentidadeUC } from "../ports/RegisterIdentidadeUC"
import type { IIdentidadeRepository } from "../ports/IdentidaedeRepository"
import type { IdentidadeDados } from "../../domain/entities/identidade/IdentidadeDados";
import type { RegisterIdentidadeDTO } from "../dtos/RegisterIdentidadeDTO";
import type { IdentidadeProps } from "../../domain/entities/identidade/IdentidadeProps";
// Entidade e Object Values do dominio
import { Identidade } from "../../domain/entities/identidade/Identidade";
import { IdentidadeId } from "../../domain/entities/identidade/IdentidadeId";
import { Data } from "../../shared/value-objects/Data";
// Funcoes auxiliares
import { CryptoIdGenerator } from "../../infra/adapters/CryptoIdGenerator";

// Utils
import { type Either, success, failure } from "../../shared/Either";

// Errors
import { IdentidadeAlreadyExistsError } from "../errors/RegistroIdentidadeError";


export class RegisterIdentidade implements IRegisterIdentidadeUC {
    private readonly _identidadeRepo: IIdentidadeRepository;
    constructor (identidadeRepo : IIdentidadeRepository) {
        this._identidadeRepo = identidadeRepo;
    }

    async registerIdentidade(identidadeDados: IdentidadeDados ): Promise<RegisterIdentidadeDTO> {

        const newId = IdentidadeId.create(new CryptoIdGenerator().generate());
        if (newId.isError()) {
            // Retorna erro em caso de id nao seja valido
            return failure(newId.value);
        }
        const identidadeOrError: Either<Error[], Identidade>  = Identidade.create(identidadeDados, newId.value);
        if (identidadeOrError.isError()) {
            // Retorna conjunto de erros se a identidade nao estiver correta
            return failure(identidadeOrError.value);
        }
        const identidade: Identidade = identidadeOrError.value;
        const identidadeExists: boolean = await this._identidadeRepo.exists(identidade.cpf);
        if (identidadeExists) {
            // Retorna erro do caso de uso se ja existe o usuario
            return failure(new IdentidadeAlreadyExistsError("A identidade ja existe."))
        }
        else {
           await this._identidadeRepo.add(identidade.value);
        }

        return success(identidade);

    }}