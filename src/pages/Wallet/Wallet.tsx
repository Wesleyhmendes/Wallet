import Header from '../../components/Header/Header';
import Table from '../../components/Table/Table';
import WalletForm from '../../components/WalletForm/WalletForm';
import './wallet.modules.css';

function Wallet() {
  return (
    <>
      <section className="header">
        <header className="mainHeader">
          <Header />
          <div className="formInputs">
            <WalletForm />
          </div>
        </header>
      </section>
      <Table />
    </>
  );
}

export default Wallet;
